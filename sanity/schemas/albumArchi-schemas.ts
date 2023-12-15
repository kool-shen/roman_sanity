const albumArchi = {
    name: "archi",
    title: "Architecture",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Nom du projet",
        type: "string",
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
        options: { source: "name" }
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
    
    
    ],
  };
    
    export default albumArchi;