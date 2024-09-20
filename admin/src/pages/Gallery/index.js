import PageLayout from "layouts/PageLayout";
import Button from "components/Button";
import { Link } from "react-router-dom";
import TableData from "./tableData";

function Gallery() {
  return (
    <PageLayout
      title={'Gallery'}
      action={
        <Button component={Link} to={`/gallery/addGallery`}>Add Gallery</Button>
      }
    >
      <TableData />
    </PageLayout>
  );
}

export default Gallery;
