export const flattenMedia = async (value) => {
  const MAX_ICON_WIDTH_PIXELS = 256;
  const {
    media,
    externalMediaLink,
    title,
    description,
    file,
    alt: mediaAlt,
    height: mediaHeight,
    width: mediaWidth,
    fm: mediaFormat,
    fill: mediaFill,
    mobileMedia,
    videoOptions: mediaVideoOptions,
    ...mediaFields
  } = value.fields;

  let mediaProps = {
    src: '',
    alt: '',
  };

  if (file) {
    mediaProps.src = file.url?.startsWith('//') ? `https:${file.url}` : file.url;
    mediaProps.alt = description || title;
    mediaProps.height = file.details.image?.height;
    mediaProps.width = file.details.image?.width;
  }

  if (media) {
    mediaProps.alt = media.fields.description;
    mediaProps.src = media.fields.file.url?.startsWith('//') ? `https:${media.fields.file.url}` : media.fields.file.url;
    mediaProps.height = media.fields.file.details.image?.height;
    mediaProps.width = media.fields.file.details.image?.width;
  }

  if (mediaAlt) {
    mediaProps.alt = mediaAlt;
  }
  if (mediaHeight) {
    mediaProps.height = mediaHeight;
  }
  if (mediaWidth) {
    mediaProps.width = mediaWidth;
  }
  if (mediaFormat) {
    mediaProps.fm = mediaFormat;
  }
  if (mediaFill) {
    mediaProps.fill = mediaFill;
    mediaProps.height = undefined;
    mediaProps.width = undefined;
  }
  if (mobileMedia) {
    mediaProps.mobileSrc = mobileMedia.fields.file.url;
  }
  if (mediaFields.placeholderMedia) {
    mediaProps.placeholderMedia = { src: mediaFields.placeholderMedia.fields.file.url };
  }

  if (mediaVideoOptions?.length) {
    mediaProps = {
      ...mediaProps,
      ...mediaVideoOptions.reduce((options, name) => ({ ...options, [name]: true }), {}),
    };
  }

  if (mediaProps.src.endsWith('.svg') && Number(mediaProps.width) <= MAX_ICON_WIDTH_PIXELS) {
    let svgMediaMapCache;
    try {
      const svgFetch = () => fetch(mediaProps.src).then((response) => response.text());

      mediaProps = {
        ...mediaProps,
        svg: await (svgMediaMapCache[mediaProps.src] || svgFetch()),
      };

      svgMediaMapCache = {
        ...svgMediaMapCache,
        [mediaProps.src]: mediaProps.svg,
      };
      return mediaProps;
    } catch (error) {
      console.error(error);
    }
  }

  if (externalMediaLink) {
    mediaProps.src = externalMediaLink;
  }

  if (mediaFields.poster) {
    mediaProps.poster = {
      src: mediaFields.poster.fields.file.url,
    };
  }

  if (mediaFields.placeholderMedia) {
    mediaProps.placeholderMedia = {
      src: mediaFields.placeholderMedia.fields.file.url,
    };
  }

  mediaProps = {
    ...mediaFields,
    ...mediaProps,
  };

  return mediaProps;
};

const FIELD_TO_IGNORE = ['entryTitle'];

export const flattenEntryFields = async (fields) => {
  let fieldData = {};

  for (const [key, value] of Object.entries(fields)) {
    if (FIELD_TO_IGNORE.includes(key)) {
      continue;
    }
    if (key === 'media' || key === 'moduleMedia' || value.sys?.type === 'Asset') {
      fieldData = {
        ...fieldData,
        [key]: await flattenMedia(value),
      };
    } else if (Array.isArray(value) && value[0]?.fields) {
      fieldData = {
        ...fieldData,
        [key]: await Promise.all(value.map((valueEntry) => flattenEntry(valueEntry, false))),
      };
    } else if (value.fields) {
      fieldData = { ...fieldData, [key]: await flattenEntry(value, false) };
    } else {
      fieldData = { ...fieldData, [key]: value };
    }
  }

  return fieldData;
};

export const flattenEntry = async (entry, useContentType = true) => {
  try {
    if (!entry?.fields) throw new Error(`An entry was not passed to be flatten. ${JSON.stringify(entry)}`);

    const {
      sys: { id, contentType },
      fields,
    } = entry;

    const fieldData = await flattenEntryFields(fields);
    return {
      id,
      ...(contentType && useContentType && { contentType: contentType.sys.id }),
      ...fieldData,
    };
  } catch (e) {
    console.error('Error over flattenEntry');
    console.error(e);
    // this will ignore the section over the render
    return { id: '' };
  }
};

export default flattenEntry;
