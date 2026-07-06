import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import type { Category, ProductFormValues, ProductStatus } from '@/types'
import type { CreateProductInput } from '@/services/productService'

interface ProductFormProps {
  categories: Category[]
  initialValues?: ProductFormValues
  onCancel: () => void
  onSubmit: (values: CreateProductInput) => Promise<void> | void
  submitLabel?: string
}

const emptyValues: ProductFormValues = {
  name: '',
  description: '',
  categoryId: '',
  price: '',
  stock: '',
  status: 'active',
  imageUrl: '',
}

type FormErrors = Partial<Record<keyof ProductFormValues, string>>

function validate(values: ProductFormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) errors.name = 'Product name is required.'
  else if (values.name.trim().length < 3) errors.name = 'Name must be at least 3 characters.'

  if (!values.description.trim()) errors.description = 'Description is required.'
  else if (values.description.trim().length < 10)
    errors.description = 'Description must be at least 10 characters.'

  if (!values.categoryId) errors.categoryId = 'Please select a category.'

  if (!values.price.trim()) errors.price = 'Price is required.'
  else if (Number.isNaN(Number(values.price)) || Number(values.price) <= 0)
    errors.price = 'Enter a valid price greater than 0.'

  if (!values.stock.trim()) errors.stock = 'Stock quantity is required.'
  else if (!Number.isInteger(Number(values.stock)) || Number(values.stock) < 0)
    errors.stock = 'Enter a whole number of 0 or more.'

  if (!values.imageUrl.trim()) errors.imageUrl = 'Image URL is required.'
  else {
    try {
      new URL(values.imageUrl)
    } catch {
      errors.imageUrl = 'Enter a valid URL (e.g. https://example.com/image.jpg).'
    }
  }

  return errors
}

export function ProductForm({
  categories,
  initialValues,
  onCancel,
  onSubmit,
  submitLabel = 'Save product',
}: ProductFormProps) {
  const [values, setValues] = useState<ProductFormValues>(initialValues ?? emptyValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setField = <K extends keyof ProductFormValues>(field: K, value: ProductFormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        name: values.name.trim(),
        description: values.description.trim(),
        categoryId: values.categoryId,
        price: Number(values.price),
        stock: Number(values.stock),
        status: values.status,
        imageUrl: values.imageUrl.trim(),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Product name</Label>
        <Input
          id="name"
          value={values.name}
          invalid={!!errors.name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder="e.g. Wireless Noise-Cancelling Headphones"
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={values.description}
          invalid={!!errors.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="Short description shown on the product page"
          rows={3}
        />
        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="category">Category</Label>
          <Select value={values.categoryId} onValueChange={(v) => setField('categoryId', v)}>
            <SelectTrigger id="category" aria-invalid={!!errors.categoryId}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && <p className="text-xs text-destructive">{errors.categoryId}</p>}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="status">Status</Label>
          <Select
            value={values.status}
            onValueChange={(v) => setField('status', v as ProductStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="out-of-stock">Out of stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={values.price}
            invalid={!!errors.price}
            onChange={(e) => setField('price', e.target.value)}
            placeholder="0.00"
          />
          {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="stock">Stock quantity</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            step="1"
            value={values.stock}
            invalid={!!errors.stock}
            onChange={(e) => setField('stock', e.target.value)}
            placeholder="0"
          />
          {errors.stock && <p className="text-xs text-destructive">{errors.stock}</p>}
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="imageUrl">Product image URL</Label>
        <Input
          id="imageUrl"
          value={values.imageUrl}
          invalid={!!errors.imageUrl}
          onChange={(e) => setField('imageUrl', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
        {errors.imageUrl && <p className="text-xs text-destructive">{errors.imageUrl}</p>}
      </div>

      <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
