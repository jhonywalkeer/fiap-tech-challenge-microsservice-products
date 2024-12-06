import { ExpressRouteAdapter } from '@main/adapters/framework'
import {
  CreateProductControllerFactory,
  FindProductByIdControllerFactory,
  FindAllProductsControllerFactory,
  UpdateProductControllerFactory,
  DeleteProductControllerFactory
} from '@main/factories/product'
import { Router } from 'express'

export const ProductsRoute = Router()

const { createProductController } = CreateProductControllerFactory()
const { findProductByIdController } = FindProductByIdControllerFactory()
const { findAllProductsController } = FindAllProductsControllerFactory()
const { updateProductController } = UpdateProductControllerFactory()
const { deleteProductController } = DeleteProductControllerFactory()

ProductsRoute.post('/', ExpressRouteAdapter(createProductController))
  .get('/:id', ExpressRouteAdapter(findProductByIdController))
  .get('/', ExpressRouteAdapter(findAllProductsController))
  .patch('/:id', ExpressRouteAdapter(updateProductController))
  .put('/:id', ExpressRouteAdapter(updateProductController))
  .delete('/:id', ExpressRouteAdapter(deleteProductController))
