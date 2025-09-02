import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getStaffByID } from "../api/queries"
import Loading from "../components/Loading"
import ReadMoreText from "../components/ReadMoreText"
import { marked } from "marked"
import CharacterList from "../components/People/CharacterList"
import { checkLinks } from "../helper"
import StaffRolesList from "../components/People/StaffRolesList"
import { motion } from "framer-motion"

function Staff() {

  let navigate = useNavigate()
  const { id } = useParams()

  const [staff, setStaff] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasImgLoaded, setHasImgLoaded] = useState(false)
  const [isPageFinal, setIsPageFinal] = useState(false)

  var variables = {
    id
  }

  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: getStaffByID,
        variables: variables
      })
    }

  useEffect(() => {
    setLoading(true)
    fetch(url, options).then(handleResponse)
      .then(handleData)
      .catch(handleError)
  }, [id])

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json)
    })
  }

  function handleData(data) {
    setLoading(false)
    setStaff(data.data.Staff)
    document.title = data.data.Staff.name.full + " - Archive"
    window.history.replaceState({}, '', `/staff/${id}/${data.data.Staff.name.full ? data.data.Staff.name.full.replace(/ /g, '-') : data.data.Staff.name.native ? data.data.Staff.name.native.replace(/ /g, '-') : ''}`)
  }

  function handleError(error) {
    setLoading(false)
    alert('Error, check console')
    console.error(error)
    navigate('/404')
  }

  return (
    <>
      {loading ? <Loading /> :
        <>
          <div className="character">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: hasImgLoaded ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              src={staff?.image?.large}
              alt={staff?.name}
              onLoad={() => setHasImgLoaded(true)}
            />
            <div className="character-info">
              <div className="character-name">
                <h2 className="h2">{staff?.name.full}</h2>
                <p className="secondary">{staff?.name.native}</p>
              </div>
              <div className="character-details">
                {!Object.values(staff?.dateOfBirth).some(value => value === null || value === undefined) && (
                  <p className="text-sm"><strong>Birthday:</strong> {new Date(staff?.dateOfBirth.year, staff?.dateOfBirth.month - 1, staff?.dateOfBirth.day).toISOString().split('T')[0]}</p>
                )}
                {staff?.age && (
                  <p className="text-sm"><strong>Age:</strong> {staff?.age}</p>
                )}
                {staff?.gender && (
                  <p className="text-sm"><strong>Gender:</strong> {staff?.gender}</p>
                )}
                {staff?.yearsActive && staff?.yearsActive.length > 0 && (
                  <p className="text-sm"><strong>Years Active:</strong> {staff?.yearsActive.join(", ")}</p>
                )}
                {staff?.homeTown && (
                  <p className="text-sm"><strong>Home Town:</strong> {staff?.homeTown}</p>
                )}
                {staff?.bloodType && (
                  <p className="text-sm"><strong>Blood Type:</strong> {staff?.bloodType}</p>
                )}
                <ReadMoreText text={checkLinks(marked.parse(staff?.description || "").replace(/\n/g, "<br>"))} maxLength={900} />
              </div>
            </div>
          </div>
          <CharacterList setIsPageFinal={setIsPageFinal} />
          <StaffRolesList enabled={isPageFinal} />
        </>
      }
    </>
  );
}

export default Staff;