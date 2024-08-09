export interface LinkItem {
  href: string;
  text: string;
  image?: React.ReactNode;
}

export interface NavbarProps {
  links: LinkItem[];
  supText: string;
}

export interface ProductAttestation {
  productName: string;
  productDescription: string;
  productPrice: number;
  creator: string;
  contentURI: string;
}
