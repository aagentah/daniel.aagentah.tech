export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  // validation: (Rule) => Rule.required(),
  of: [
    {
      title: "Block",
      type: "block",
    },
  ],
};
