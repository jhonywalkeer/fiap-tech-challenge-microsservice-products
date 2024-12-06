import { IdentifierDTO } from '@application/dtos/common'
import { Field, Size } from '@domain/enums'
import { CreateProduct } from '@domain/interfaces/product'
import {
  IsEnumValidator,
  IsNumberValidator,
  IsStringValidator
} from '@presentation/validators'

export class UpdateProductDTO extends IdentifierDTO {
  name?: string
  description?: string
  price?: number
  category_id?: string
  size?: Size

  constructor(id: string, fields: Partial<CreateProduct>) {
    super(id)
    if (fields.name) {
      this.name = IsStringValidator(fields.name, Field.Name)
    }
    if (fields.description) {
      this.description = IsStringValidator(
        fields.description,
        Field.Description
      )
    }

    if (fields.price) {
      this.price = IsNumberValidator(fields.price, Field.Price)
    }

    if (fields.category_id) {
      this.category_id = IsStringValidator(
        fields.category_id,
        Field.CategoryIdentifier
      )
    }

    if (fields.size) {
      this.size = IsEnumValidator(
        fields.size.toUpperCase(),
        Size,
        Field.Size
      ) as Size
    }
  }
}
