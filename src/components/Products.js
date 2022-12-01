import React from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { getCTToken } from "../API/getCTToken";
import ProductGall from "./ProductGall";

const QUERY_CT_PRODUCTS_DETAIL = gql`
  query getProductsDetails($currency: Currency!) {
    products(limit: 20, offset: 20) {
      results {
        id
        key
        masterData {
          current {
            name(locale: "en")
            masterVariant {
              images {
                url
              }
              price(currency: $currency) {
                value {
                  type
                  centAmount
                  fractionDigits
                }
              }
            }
          }
        }
      }
    }
  }
`;

function ProductsDetail() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getProductsDetails"],
    queryFn: async () =>
      request({
        url: `https://api.us-central1.gcp.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/graphql`,
        document: QUERY_CT_PRODUCTS_DETAIL,
        variables: { currency: "EUR" },
        requestHeaders: {
          authorization: await getCTToken().then(
            (res) => `Bearer ${res.access_token}`
          ),
        },
      }),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return console.log(error);
  const productsWPrice =
    data &&
    data.products.results.map((product) => {
      return {
        id: product.id,
        key: product.key,
        name: product.masterData.current.name,
        image: product.masterData.current.masterVariant.images[0],
        price: product.masterData.current.masterVariant.price,
      };
    });
  console.log("data: ", data);
  console.log("data from commercetools with price: ", productsWPrice);
  return (
    <div>{productsWPrice && <ProductGall products={productsWPrice} />}</div>
  );
}

export default ProductsDetail;
