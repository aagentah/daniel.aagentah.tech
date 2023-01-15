export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  // validation: (Rule) => Rule.required(),
  of: [
    {
      title: "Block",
      type: "block"
    },
    {
      name: "iframeEmbedBlock",
      title: "Iframe Embed",
      type: "object",
      fields: [
        {
          name: "iframeUrl",
          title: "Iframe URL",
          type: "string",
          description: "",
          validation: Rule => Rule.required()
        },
        {
          name: "iframeHeightDesktop",
          title: "Iframe Height (Desktop) [px]",
          type: "string",
          description: "",
          validation: Rule => Rule.required()
        },
        {
          name: "iframeHeightMobile",
          title: "Iframe Height (Mobile) [px]",
          type: "string",
          description: "",
          validation: Rule => Rule.required()
        }
      ]
    }
  ]
};
