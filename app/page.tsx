import { client } from "../lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import Image from "next/image";

type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: "reference";
  };
};

type LandingPageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  price?: number;
  ctaText?: string;
};

const builder = createImageUrlBuilder(client);
const urlFor = (source: SanityImage) => builder.image(source);

export default async function Home() {
  const data = await client.fetch<LandingPageData>(
    `*[_type == "landingPage"][0]{
      heroTitle,
      heroSubtitle,
      heroImage,
      price,
      ctaText
    }`
  );
  const ctaText = data?.ctaText || "Поръчай сега";

  return (
    <main className="min-h-screen bg-[#f9f9f9] px-4 py-10 text-gray-900 sm:px-6 sm:py-14 md:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-10">
        {/* HERO */}
        <section className="rounded-3xl bg-white px-6 py-10 text-center shadow-sm ring-1 ring-black/5 sm:px-10 sm:py-14">
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {data?.heroTitle}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:mt-6 sm:text-lg">
            {data?.heroSubtitle}
          </p>

          <div className="mt-7 inline-flex items-center rounded-full bg-neutral-900 px-6 py-3 text-xl font-semibold text-white sm:mt-8 sm:text-2xl">
            {data?.price} лв
          </div>

          <div className="mt-5 sm:mt-6">
            <button className="rounded-full bg-black px-10 py-3.5 text-base font-medium text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 sm:text-lg">
              {ctaText}
            </button>
          </div>

          {data?.heroImage && (
            <Image
              src={urlFor(data.heroImage).width(1100).url()}
              alt={data?.heroTitle || "Product image"}
              width={1100}
              height={620}
              className="mx-auto mt-8 w-full max-w-4xl rounded-3xl object-cover shadow-md sm:mt-10"
            />
          )}
        </section>

        {/* TRUST */}
        <section className="rounded-3xl bg-white px-6 py-7 text-center shadow-sm ring-1 ring-black/5 sm:px-10 sm:py-8">
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Над 1000+ доволни клиенти, препоръчано от родители и създадено за
            смислена игра у дома.
          </p>
        </section>

        {/* FEATURES */}
        <section className="rounded-3xl bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 sm:px-10 sm:py-12">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl bg-[#f9f9f9] p-6 text-center">
              <h3 className="text-xl font-semibold">Развива умения</h3>
              <p className="mt-2 text-gray-600">Логика, памет и креативност.</p>
            </article>

            <article className="rounded-2xl bg-[#f9f9f9] p-6 text-center">
              <h3 className="text-xl font-semibold">Забавно обучение</h3>
              <p className="mt-2 text-gray-600">Децата учат естествено чрез игра.</p>
            </article>

            <article className="rounded-2xl bg-[#f9f9f9] p-6 text-center">
              <h3 className="text-xl font-semibold">Перфектен подарък</h3>
              <p className="mt-2 text-gray-600">Подходящ за всеки специален повод.</p>
            </article>
          </div>
        </section>

        {/* IMAGE + TEXT */}
        <section className="rounded-3xl bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 sm:px-10 sm:py-12">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Защо децата обичат тази игра?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                Комбинация от забавление и учене, която задържа вниманието и
                насърчава увереното развитие стъпка по стъпка.
              </p>
            </div>

            {data?.heroImage && (
              <Image
                src={urlFor(data.heroImage).width(800).url()}
                alt="Children playing with product"
                width={800}
                height={560}
                className="h-full w-full rounded-3xl object-cover"
              />
            )}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="rounded-3xl bg-white px-6 py-12 text-center shadow-sm ring-1 ring-black/5 sm:px-10 sm:py-14">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Готови ли сте да зарадвате детето си?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Поръчайте днес и направете ученето любима част от ежедневието.
          </p>

          <button className="mt-6 rounded-full bg-black px-10 py-3.5 text-base font-medium text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 sm:mt-8 sm:text-lg">
            {ctaText}
          </button>
        </section>
      </div>
    </main>
  );
}