export var getAnimeByID = `
query ($id: Int, $type: MediaType) { # Define which variables will be used in the query (id)
  Media (id: $id, type: $type) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    description
    format
    type
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
