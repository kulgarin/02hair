import Image from "next/image";
import type { ResolvedProduct } from "@/data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProductCardProps = {
  item: ResolvedProduct;
};

export function ProductCard({ item }: ProductCardProps) {
  const { product, brand, category } = item;
  const link = product.url ?? brand.siteUrl;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_18px_40px_-28px_rgba(70,48,24,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-square bg-muted">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{brand.name}</p>
        <h3 className="mt-1 font-heading text-2xl leading-tight">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.purpose}</p>
        {product.price ? (
          <p className="mt-3 text-sm">
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: product.price.currency,
              maximumFractionDigits: 0,
            }).format(product.price.amount)}
          </p>
        ) : null}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="mt-4 h-10 w-full cursor-pointer rounded-full"
            >
              Смотреть средство
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
            <DialogHeader>
              <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {brand.name}
              </p>
              <DialogTitle className="font-heading text-3xl leading-tight font-medium">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-foreground">
                {product.purpose}
              </DialogDescription>
            </DialogHeader>
            <dl className="space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                  Категория
                </dt>
                <dd className="mt-0.5">{category.name}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                  Как часто
                </dt>
                <dd className="mt-0.5">{category.frequency}</dd>
              </div>
            </dl>
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline decoration-gold/60 underline-offset-4"
              >
                {product.url ? "Страница средства" : "Сайт марки"}
              </a>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}
