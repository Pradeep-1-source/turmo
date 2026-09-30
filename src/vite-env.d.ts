/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly NEXT_PUBLIC_SUPABASE_URL?: string;
  readonly NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  readonly NEXT_PUBLIC_BUSINESS_PHONE?: string;
  readonly NEXT_PUBLIC_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'next/link' {
  import React from 'react';
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    to?: string;
    children: React.ReactNode;
    className?: string;
  }
  const Link: React.FC<LinkProps>;
  export default Link;
}

declare module 'next/image' {
  import React from 'react';
  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    quality?: number;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
  }
  const Image: React.FC<ImageProps>;
  export default Image;
}

declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
    prefetch: () => void;
  };
  export function useParams<T = Record<string, string>>(): T;
  export function useSearchParams(): URLSearchParams;
  export function notFound(): never;
}
