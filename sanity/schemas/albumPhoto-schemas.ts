const photoAlbum = {
  name: "album",
  title: "Photographie",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "images",
      title: "Slider 1",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alt",
                  type: "string",
                },
              ],
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule: { custom: (arg0: (images: string) => true | "Slider 1 is required") => any; }) =>
      Rule.custom((images: string ) => {
        return images && images.length > 0
          ? true
          : 'Slider 1 is required';
      }),
      },
    {
      name: "images2",
      title: "Slider 2",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alt",
                  type: "string",
                },
              ],
            },
            {
              name: "description",
              title: "Description",
              type: "string",
            },
          ],
        },
      ],

      validation: (Rule: { custom: (arg0: (images2: any) => true | "Slider 2 is required") => any; }) =>
        Rule.custom((images2: string | any[]) => {
          return images2 && images2.length > 0
            ? true
            : 'Slider 2 is required';
        }),

    },
    {
      name: "content",
      title: "Description de l'album",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
  
  export default photoAlbum;