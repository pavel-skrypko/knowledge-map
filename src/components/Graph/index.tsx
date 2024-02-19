import "reactflow/dist/style.css";

import { useCallback, useState } from "react";
import ReactFlow, {
  Controls,
  MiniMap,
  addEdge,
  OnConnect,
  Background,
  BackgroundVariant,
  Edge,
  FitViewOptions,
  DefaultEdgeOptions,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
} from "reactflow";
import { dataMockEdges, dataMockNodes } from "./data.mock";
import { CustomArticleNode } from "./node";
import { FormProvider, useForm } from "react-hook-form";
import { FilterForm } from "./components/FilterForm";

import HelpIcon from "@mui/icons-material/Help";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
interface FormProps {
  category: string;
}

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes = { articleNode: CustomArticleNode };

const Graph = () => {
  const methods = useForm<FormProps>({
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: {
      category: "",
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nodes, setNodes] = useState<Node[]>(dataMockNodes);
  const [edges, setEdges] = useState<Edge[]>(dataMockEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <FormProvider {...methods}>
      <Grid
        container
        direction="row"
        xs={12}
        sx={{ width: "100vw" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <FilterForm />
        <HelpIcon onClick={handleOpen} />
      </Grid>
      <div style={{ width: "100%", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Cross} gap={10} size={1} />
        </ReactFlow>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Text
          </Typography>
          <Button onClick={handleClose}>X</Button>
        </Box>
      </Modal>
    </FormProvider>
  );
};

export default Graph;
