import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { CategoryInput } from '@/services/categoryService'

interface CategoryFormValues {
  name: string
  description: string
}

interface CategoryFormProps {
  initialValues?: CategoryFormValues
  onCancel: () => void
  onSubmit: (values: CategoryInput) => Promise<void> | void
  submitLabel?: string
}

type FormErrors = Partial<Record<keyof CategoryFormValues, string>>

function validate(values: CategoryFormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Category name is required.'
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!values.description.trim()) errors.description = 'Description is required.'
  else if (values.description.trim().length < 5)
    errors.description = 'Description must be at least 5 characters.'

  return errors
}

export function CategoryForm({
  initialValues,
  onCancel,
  onSubmit,
  submitLabel = 'Save category',
}: CategoryFormProps) {
  const [values, setValues] = useState<CategoryFormValues>(
    initialValues ?? { name: '', description: '' }
  )
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setField = (field: keyof CategoryFormValues, value: string) => {
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
      await onSubmit({ name: values.name.trim(), description: values.description.trim() })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="cat-name">Category name</Label>
        <Input
          id="cat-name"
          value={values.name}
          invalid={!!errors.name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder="e.g. Audio"
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="cat-description">Description</Label>
        <Textarea
          id="cat-description"
          value={values.description}
          invalid={!!errors.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="Short description of what belongs in this category"
          rows={3}
        />
        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
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
