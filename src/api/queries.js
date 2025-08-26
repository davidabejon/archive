export const getAnimeByID = `
query ($id: Int, $type: MediaType) {
  Media (id: $id, type: $type) {
    id
    description
    format
    type
    status
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    title {
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
    episodes
    chapters
    volumes
    duration
    genres
    meanScore
    popularity
    studios {
      edges {
        isMain
        node {
          name
        }
      }
    }
    synonyms
    relations {
      edges {
        relationType
        node {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            large
            medium
          }
          type
          status
          startDate {
            year
            month
            day
          }
        }
      }
    }
    characters (sort: RELEVANCE) {
      edges {
        role
        node {
          id
          name {
            full
            native
          }
          image {
            large
            medium
          }
        }
        voiceActors {
          id
          name {
            full
            native
          }
          image {
            large
            medium
          }
          languageV2
        }
      }
    }
    staff (sort: RELEVANCE) {
      edges {
        role
        node {
          id
          name {
            full
            native
          }
          image {
            large
            medium
          }
        }
      }
    }
    trailer {
      id
      site
      thumbnail
    }
    externalLinks {
      site
      url
      color
      icon
    }
  }
}
`

export const getCharacterByID = `
query ($id: Int) {
  Character (id: $id) {
    id
    name {
      full
      native
      alternative
      alternativeSpoiler
    }
    image {
      large
      medium
    }
    description
    age
    gender
    dateOfBirth {
      year
      month
      day
    }
    media {
      edges {
        node {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            large
            medium
          }
          type
          status
        }
      }
    }
  }
}
`

export const getCharactersPage = `
query ($id: Int, $type: MediaType, $page: Int, $perPage: Int) {
  Media(id: $id, type: $type) {
    id
    characters(sort: RELEVANCE, page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
      }
      edges {
        role
        node {
          id
          name {
            full
            native
          }
          image {
            large
            medium
          }
        }
        voiceActors {
          id
          name {
            full
            native
          }
          image {
            large
            medium
          }
          languageV2
        }
      }
    }
  }
}
`

export const getStaffPage = `
query ($id: Int, $type: MediaType, $page: Int, $perPage: Int) {
  Media(id: $id, type: $type) {
    id
    staff(sort: RELEVANCE, page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
      }
      edges {
        role
        node {
          id
          name {
            full
            native
          }
          image {
            large
            medium
          }
        }
      }
    }
  }
}
`