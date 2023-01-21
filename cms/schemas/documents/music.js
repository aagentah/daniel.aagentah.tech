export default {
  name: "music",
  type: "document",
  title: "Music",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      required: true
    },
    {
      name: "slug",
      title: "Slug",
      description:
        "The unique URL for this item. For example: joe-blogs-interview",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      required: true
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description:
        "A short description of the item, typically around 50-160 characters.",
      type: "string",
      validation: Rule => Rule.required().max(160)
    },
    {
      name: "content",
      title: "Content",
      type: "blockContent"
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      required: true
    },
    {
      name: "date",
      title: "Release Date",
      type: "datetime",
      validation: Rule => Rule.required()
    },
    {
      name: "smartLink",
      title: "Smart Link",
      type: "reference",
      to: { type: "smartLink" },
      validation: Rule => Rule.required()
    }
  ],
  orderings: [
    {
      title: "Date",
      name: "date",
      by: [{ field: "date", direction: "desc" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage"
    }
  }
};
