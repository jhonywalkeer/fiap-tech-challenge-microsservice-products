import { BaseEntity, CategoryEntity } from '@domain/entities'

export class ProductEntity extends BaseEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public size: string,
    public category?: CategoryEntity,
    public create_at?: Date,
    public update_at?: Date
  ) {
    super(id, create_at, update_at)
  }
}
