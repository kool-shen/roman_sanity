const albumArchi = {
    name: "archi",
    title: "Architecture",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Nom du projet",
        type: "string",
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      
      {
        name: "content",
        title: "Description",
        type: "array",
        of: [{ type: "block" }],
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: { source: "name" },
        validation: (Rule: { required: () => any; }) => Rule.required(),
      },
      {
        name: "program",
        title: "Programme",
        type: "string",
      },
      {
        name: "sponsor",
        title: "Commanditaire",
        type: "string",
      },
      {
        name: "localisation",
        title: "Localisation",
        type: "string",
      },
      {
        name: "calendar",
        title: "Calendrier",
        type: "string",
      },
      {
        name: "surface",
        title: "Surface",
        type: "number",
      },
      {
        name: "cost",
        title: "Coût",
        type: "number",
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
                    name: "name",
                    title: "Nom",
                    type: "string",
                  },
              {
                name: "image",
                title: "Image",
                type: "image",
                options: { hotspot: true },
                fields: [
                  {
                    name: "photoCaption",
                    title: "Légende",
                    type: "string",
                  },
                ],
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
                    name: "name",
                    title: "Nom",
                    type: "string",
                  },
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
            ],
          },
        ],
      },
      {
        name: "videos",
        title: "Vidéos",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "video",
                title: "Vidéo",
                type: "file",
                // type: "mux.video",
                options: { accept: "video/*" },
              },
              {
                name: "description",
                title: "Description",
                type: "string",
              },
            ],
          },
        ],
      },
    
    
    ],
  };
    
    export default albumArchi;