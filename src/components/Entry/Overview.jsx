import Card from '../Card'
import { DAILYMOTION_URL, relationTypes, statuses, YT_URL } from '../../constants'
import { capitalize } from '../../helper'
import '../../styles/Overview.css'

function Overview({ relations, characters, staff, trailer }) {

  const relationsOrdered = relations?.sort((a, b) => {
    const startDateA = new Date(a.startDate.year, a.startDate.month - 1, a.startDate.day)
    const startDateB = new Date(b.startDate.year, b.startDate.month - 1, b.startDate.day)
    return startDateA - startDateB
  })

  return (
    <div>
      {relations && (
        <>
          <h6 className="h5 mb-2">Relations</h6>
          <div className="flex gap-4 flex-wrap">
            {
              relationsOrdered.map((relation) => (
                <Card
                  key={relation.id}
                  imageSrc={relation.coverImage.medium}
                  title={relation.title.english || relation.title.romaji}
                  subtitle={`${capitalize(relation.type)} · ${statuses[relation.status] || relation.status}`}
                  link={`/${relation.type.toLowerCase()}/${relation.id}`}
                  tag={relationTypes[relation.relationType] || capitalize(relation.relationType)}
                  type={relationsOrdered.length > 4 ? 'small' : 'default'}
                />
              ))
            }
          </div>
        </>
      )}
      {characters && (
        <>
          <h6 className="h5 mb-2 mt-8">Characters</h6>
          <div className="flex gap-4 flex-wrap">
            {
              characters.map((character) => (
                <Card
                  key={character.id}
                  imageSrc={character.image.medium}
                  secondImageSrc={character.voiceActors[0]?.image?.medium}
                  title={character.name.full || character.name.native}
                  secondTitle={character.voiceActors[0]?.name?.full || character.voiceActors[0]?.name?.native}
                  subtitle={capitalize(character.role)}
                  secondSubtitle={capitalize(character.voiceActors[0]?.languageV2)}
                  link={`/character/${character.id}`}
                  secondLink={`/staff/${character.voiceActors[0]?.id}`}
                  type={'double'}
                />
              ))
            }
          </div>
        </>
      )}
      {staff && (
        <>
          <h6 className="h5 mb-2 mt-8">Staff</h6>
          <div className="flex gap-4 flex-wrap">
            {
              staff.map((member) => (
                <Card
                  key={member.id}
                  imageSrc={member.image.medium}
                  title={member.name.full || member.name.native}
                  subtitle={capitalize(member.role)}
                  link={`/staff/${member.id}`}
                  type={'default-sm'}
                />
              ))
            }
          </div>
        </>
      )}
      {trailer && (
        <>
          <h6 className="h5 mb-2 mt-8">Trailer</h6>
          <iframe
            className='trailer'
            src={`${trailer.site === 'youtube' ? YT_URL : DAILYMOTION_URL}${trailer.id}`}
            allowFullScreen
          ></iframe>
        </>
      )}
    </div>
  )
}

export default Overview