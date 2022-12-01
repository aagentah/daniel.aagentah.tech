export default {
  name: "author",
  type: "document",
  title: "Author",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      description: "The unique URL for this item. For example: joe-blogs",
      type: "slug",
      options: {
        source: "name",
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
        "A short description of the item, typically around 50-160 characters.",
      type: "string",
      validation: (Rule) => Rule.required().max(160),
    },
    {
      name: "picture",
      title: "Picture",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
  ],
  orderings: [
    {
      title: "Name",
      name: "author",
      by: [{ field: "author", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "picture",
    },
  },
};
