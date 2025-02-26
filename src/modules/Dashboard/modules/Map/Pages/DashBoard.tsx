import LevelMap from "./Map"
import { ReactFlowProvider } from "reactflow";

function Dashboard() {
    return(
        <ReactFlowProvider>
        <LevelMap />
      </ReactFlowProvider>
    )
}

export default Dashboard