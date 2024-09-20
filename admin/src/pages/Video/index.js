import PageLayout from "layouts/PageLayout";
import Button from "components/Button";
import { Link } from "react-router-dom";
import TableData from "./tableData";

function Videos() {
  return (
    <PageLayout
      title={'Videos'}
      action={
        <Button component={Link} to={`/videos/addVideo`}>Add Video</Button>
      }
    >
      <TableData/>
    </PageLayout>
  );
}

export default Videos;
