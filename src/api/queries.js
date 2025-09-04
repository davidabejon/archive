export const getAnimeByID = `
query ($id: Int, $type: MediaType) {
  Media (id: $id, type: $type) {
    id
    description (asHtml: true)
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
    description (asHtml: true)
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

export const getStaffByID = `
query staff($id:Int,$sort:[MediaSort],$characterPage:Int,$staffPage:Int,$onList:Boolean,$type:MediaType,$withCharacterRoles:Boolean = false,$withStaffRoles:Boolean = false){Staff(id:$id){id name{first middle last full native userPreferred alternative}image{large}description favourites isFavourite isFavouriteBlocked age gender yearsActive homeTown bloodType primaryOccupations dateOfBirth{year month day}dateOfDeath{year month day}language:languageV2 characterMedia(page:$characterPage,sort:$sort,onList:$onList)@include(if:$withCharacterRoles){pageInfo{total perPage currentPage lastPage hasNextPage}edges{characterRole characterName node{id type bannerImage isAdult title{userPreferred}coverImage{large}startDate{year}mediaListEntry{id status}}characters{id name{userPreferred}image{large}}}}staffMedia(page:$staffPage,type:$type,sort:$sort,onList:$onList)@include(if:$withStaffRoles){pageInfo{total perPage currentPage lastPage hasNextPage}edges{staffRole node{id type isAdult title{userPreferred}coverImage{large}mediaListEntry{id status}}}}}}
`

export const getStaffCharacters = `
query staff($id:Int,$sort:[MediaSort],$characterPage:Int,$staffPage:Int,$onList:Boolean,$type:MediaType,$withCharacterRoles:Boolean = false,$withStaffRoles:Boolean = false){Staff(id:$id){id name{first middle last full native userPreferred alternative}image{large}description favourites isFavourite isFavouriteBlocked age gender yearsActive homeTown bloodType primaryOccupations dateOfBirth{year month day}dateOfDeath{year month day}language:languageV2 characterMedia(page:$characterPage,sort:$sort,onList:$onList)@include(if:$withCharacterRoles){pageInfo{total perPage currentPage lastPage hasNextPage}edges{characterRole characterName node{id type bannerImage isAdult title{userPreferred}coverImage{large}startDate{year}mediaListEntry{id status}}characters{id name{userPreferred}image{large}}}}staffMedia(page:$staffPage,type:$type,sort:$sort,onList:$onList)@include(if:$withStaffRoles){pageInfo{total perPage currentPage lastPage hasNextPage}edges{staffRole node{id type isAdult title{userPreferred}coverImage{large}mediaListEntry{id status}}}}}}
`

export const getStaffRoles = `
query staff($id:Int,$sort:[MediaSort],$characterPage:Int,$staffPage:Int,$onList:Boolean,$type:MediaType,$withCharacterRoles:Boolean = false,$withStaffRoles:Boolean = false){Staff(id:$id){id name{first middle last full native userPreferred alternative}image{large}description favourites isFavourite isFavouriteBlocked age gender yearsActive homeTown bloodType primaryOccupations dateOfBirth{year month day}dateOfDeath{year month day}language:languageV2 characterMedia(page:$characterPage,sort:$sort,onList:$onList)@include(if:$withCharacterRoles){pageInfo{total perPage currentPage lastPage hasNextPage}edges{characterRole characterName node{id type bannerImage isAdult title{userPreferred}coverImage{large}startDate{year}mediaListEntry{id status}}characters{id name{userPreferred}image{large}}}}staffMedia(page:$staffPage,type:$type,sort:$sort,onList:$onList)@include(if:$withStaffRoles){pageInfo{total perPage currentPage lastPage hasNextPage}edges{staffRole node{id type isAdult title{userPreferred}coverImage{large}mediaListEntry{id status}}}}}}
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

export const getTrending = `
query{Trending:Page(perPage:6){media(isAdult:false,sort:TRENDING_DESC){...media}}NewAnime:Page(perPage:6){media(type:ANIME,isAdult:false,sort:ID_DESC){...media}}NewManga:Page(perPage:6){media(type:MANGA,isAdult:false,sort:ID_DESC){...media}}}fragment media on Media{id type status(version:2)format episodes chapters trending bannerImage title{userPreferred}coverImage{large}}
`