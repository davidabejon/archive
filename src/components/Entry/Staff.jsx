import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStaffPage } from "../../api/queries";
import Spinner from "../Spinner";
import Card from "../Card";
import { Button } from "antd";
import { capitalize } from "../../helper";

function Staff() {

  const { id } = useParams()
  const { type } = useParams()

  const [staff, setStaff] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStaff = async () => {
      let allStaff = []

      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          query: getStaffPage,
          variables: { id: id, type: type.toUpperCase(), page, perPage: 25 },
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.errors[0].message)
        setLoading(false)
        return
      }
      const staffData = data.data.Media.staff

      allStaff = [
        ...staff,
        ...staffData.edges.map(edge => ({
          ...edge.node,
          role: edge.role,
          voiceActors: edge.voiceActors,
        })),
      ]

      setHasNextPage(staffData.pageInfo.hasNextPage)

      setLoading(false)
      setStaff(allStaff)
    }

    setLoading(true)
    fetchStaff()
  }, [id, type, page])

  return (
    <div>
      {loading && staff.length === 0 && (
        <Spinner />
      )}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="flex flex-wrap gap-4">
        {staff.map(member => (
          <Card
            key={member.id}
            imageSrc={member.image.medium}
            title={member.name.full || member.name.native}
            subtitle={capitalize(member.role)}
            type={'default-sm'}
          />
        ))}
      </div>
      {hasNextPage && staff.length > 0 && (
        <Button type="primary" className="mt-5" loading={loading} onClick={() => setPage(prevPage => prevPage + 1)} disabled={!hasNextPage}>
          Load More
        </Button>
      )}
    </div>
  );
}

export default Staff;