import { UpdateProductDTO } from '@application/dtos/product'
import { Size } from '@domain/enums'
import { CreateProduct } from '@domain/interfaces/product'
import { InputProductBodyMock, InputProductParamMock } from '@mocks/products'

describe(`[DTO's] Update Product DTO`, () => {
  it('should create a new product with all fields', () => {
    const body: CreateProduct = {
      ...InputProductBodyMock,
      size: Size.Medium
    }
    const input: UpdateProductDTO = new UpdateProductDTO(
      InputProductParamMock,
      body
    )

    expect(input).toBeInstanceOf(UpdateProductDTO)
    expect(input.id).toBe(InputProductParamMock)
    expect(input.name).toBe(InputProductBodyMock.name)
    expect(input.description).toBe(InputProductBodyMock.description)
    expect(input.category_id).toBe(InputProductBodyMock.category_id)
    expect(input.price).toBe(InputProductBodyMock.price)
    expect(input.size).toBe(Size.Medium)
  })

  it('should update an instance with id only', () => {
    const input = new UpdateProductDTO(InputProductParamMock, {})

    expect(input.id).toBe(InputProductParamMock)
    expect(input.name).toBeUndefined()
    expect(input.description).toBeUndefined()
  })

  it('should update an instance with name only', () => {
    const body: Partial<CreateProduct> = { name: InputProductBodyMock.name }
    const input: UpdateProductDTO = new UpdateProductDTO(
      InputProductParamMock,
      body
    )

    expect(input.id).toBe(InputProductParamMock)
    expect(input.name).toBe(InputProductBodyMock.name)
    expect(input.description).toBeUndefined()
    expect(input.category_id).toBeUndefined()
    expect(input.price).toBeUndefined()
    expect(input.size).toBeUndefined()
  })

  it('should update an instance with description only', () => {
    const body: Partial<CreateProduct> = {
      description: InputProductBodyMock.description
    }
    const input: UpdateProductDTO = new UpdateProductDTO(
      InputProductParamMock,
      body
    )

    expect(input.id).toBe(InputProductParamMock)
    expect(input.name).toBeUndefined()
    expect(input.description).toBe(InputProductBodyMock.description)
    expect(input.category_id).toBeUndefined()
    expect(input.price).toBeUndefined()
    expect(input.size).toBeUndefined()
  })

  it('should update an instance with price only', () => {
    const body: Partial<CreateProduct> = { price: InputProductBodyMock.price }
    const input: UpdateProductDTO = new UpdateProductDTO(
      InputProductParamMock,
      body
    )

    expect(input.id).toBe(InputProductParamMock)
    expect(input.name).toBeUndefined()
    expect(input.description).toBeUndefined()
    expect(input.category_id).toBeUndefined()
    expect(input.price).toBe(InputProductBodyMock.price)
    expect(input.size).toBeUndefined()
  })

  it('should update an instance with category_id only', () => {
    const body: Partial<CreateProduct> = {
      category_id: InputProductBodyMock.category_id
    }
    const input: UpdateProductDTO = new UpdateProductDTO(
      InputProductParamMock,
      body
    )

    expect(input.id).toBe(InputProductParamMock)
    expect(input.name).toBeUndefined()
    expect(input.description).toBeUndefined()
    expect(input.category_id).toBe(InputProductBodyMock.category_id)
    expect(input.price).toBeUndefined()
    expect(input.size).toBeUndefined()
  })

  it('should update an instance with size only', () => {
    const body: Partial<CreateProduct> = { size: Size.Small }
    const input: UpdateProductDTO = new UpdateProductDTO(
      InputProductParamMock,
      body
    )

    expect(input.id).toBe(InputProductParamMock)
    expect(input.name).toBeUndefined()
    expect(input.description).toBeUndefined()
    expect(input.category_id).toBeUndefined()
    expect(input.price).toBeUndefined()
    expect(input.size).toBe(Size.Small)
  })
})
