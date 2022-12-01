import React from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import "../styles/footer.css";

const GET_FOOTER = gql`
  query GetFooter {
    all_footer {
      items {
        freelancer {
          body
          title
        }
        location {
          address
          title
        }
        social {
          title
          social_links {
            title
            url
          }
        }
        title
        copyright
      }
    }
  }
`;

const Footer = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["GetFooter"],
    queryFn: async () =>
      request({
        url: `https://graphql.contentstack.com/stacks/${process.env.REACT_APP_CS_STACK_API_KEY}?environment=${process.env.REACT_APP_CS_ENVIRONMENT_NAME}`,
        document: GET_FOOTER,
        requestHeaders: {
          access_token: process.env.REACT_APP_DELIVERY_TOKEN,
        },
      }),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return console.log(error);
  const footerData = data && data.all_footer.items[0];
  console.log("footer data: ", footerData);
  return (
    <footer className="footerWrapper">
      <div className="footerMenu"></div>
      {footerData.social.social_links ? (
        <div className="footerSocial">
          {footerData.social.social_links.map((social) => {
            return <div key={social.title}>{social.title}</div>;
          })}
        </div>
      ) : (
        ""
      )}
      <div className="footerContact">
        <div className="footerContactAddress">
          {footerData.location.address}
        </div>
      </div>
      <div className="footerCopyright"> {footerData.copyright}</div>
    </footer>
  );
};

export default Footer;
