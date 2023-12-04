import { gql } from '@apollo/client'

export default ProductSchemas = {
  productList: gql`
    query products($first: Int!, $after: String) {
      products(first: $first, reverse: true, after: $after) {
        edges {
          node {
            id
            title
            vendor
            productType
            handle
            images(first: 5) {
              edges {
                node {
                  id
                  url
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                  }
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        filters {
          id
          label
          type
          values {
            id
            count
            input
            label
          }
        }
      }
    }
  `,

  productDetail: gql`
    query getProductById($id: ID!) {
      product(id: $id) {
        id
        title
        vendor
        productType
        handle
        description
        images(first: 5) {
          edges {
            node {
              id
              url
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              compareAtPrice {
                amount
                currencyCode
              }
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `,
}
