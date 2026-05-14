export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Legal Docs", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Legal Docs", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Press", href: "#" },
      { label: "Company", href: "#" },
    ],
  },
];
