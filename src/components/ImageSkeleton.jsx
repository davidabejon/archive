import { Skeleton } from "antd";

function ImageSkeleton() {
  return (
    <div>
      <Skeleton.Image active style={{height: '270px', width: '185px'}} />
      <Skeleton active paragraph={{ rows: 2 }} title={false} className="mt-2" />
    </div>
  );
}

export default ImageSkeleton;