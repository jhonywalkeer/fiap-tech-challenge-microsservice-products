import { BaseEntity } from '@domain/entities'
import { InputProductParamMock } from '@mocks/products'

describe('[Entities] Base Entity', () => {
  it('should create an instance with required properties', () => {
    const id = InputProductParamMock
    const entity = new BaseEntity(id)

    expect(entity.id).toBe(id)
    expect(entity.create_at).toBeUndefined()
    expect(entity.update_at).toBeUndefined()
    expect(entity.delete_at).toBeUndefined()
  })

  it('should create an instance with all properties', () => {
    const id = InputProductParamMock
    const createAt = new Date()
    const updateAt = new Date()
    const deleteAt = new Date()
    const entity = new BaseEntity(id, createAt, updateAt, deleteAt)

    expect(entity.id).toBe(id)
    expect(entity.create_at).toBe(createAt)
    expect(entity.update_at).toBe(updateAt)
    expect(entity.delete_at).toBe(deleteAt)
  })
})
