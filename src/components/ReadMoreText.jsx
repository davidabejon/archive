import { Modal } from "antd"
import { useState } from "react"

function ReadMoreText({ text, maxLength = 300, className = "" }) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {
        text?.length > maxLength ?
          <>
            <p className={`text-sm w-full ${className}`} dangerouslySetInnerHTML={{ __html: new DOMParser().parseFromString(text.slice(0, maxLength) + '...', 'text/html').body.innerHTML }} />
            <button className='text-blue-300 font-bold text-sm mt-2 read-more-btn' onClick={showModal}>Read more</button>
            <Modal
              title="Description"
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              width={{
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '60%',
                xl: '50%',
                xxl: '40%',
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: new DOMParser().parseFromString(text, 'text/html').body.innerHTML }} />
            </Modal>
          </>
          :
          <p className={`text-sm mt-3 w-full ${className}`} dangerouslySetInnerHTML={{ __html: new DOMParser().parseFromString(text, 'text/html').body.innerHTML }} />
      }
    </>
  )
}

export default ReadMoreText