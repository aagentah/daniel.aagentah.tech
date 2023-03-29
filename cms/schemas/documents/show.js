export default {
  name: "show",
  type: "document",
  title: "Show",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      description:
        "The unique URL for this item. For example: joe-blogs-interview",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description:
        "A short description of the item, typically around 70-200 characters.",
      type: "string",
      validation: (Rule) => Rule.required().max(160),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
    },
    {
      name: "date",
      title: "Show Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "URL",
      type: "string",
    },
  ],
  orderings: [
    {
      title: "Price",
      name: "price",
      by: [{ field: "price", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
  },
};
