import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow
} from 'react-flow';
import 'react-flow/dist/style.css';
import { useAutomationStore } from "../../hooks/use-automation-data";
import { useShallow } from 'zustand/react/shallow';
import CustomNode from './CustomNode';
import { WorkflowNodeData } from '@shared/types';
import { Skeleton } from '../ui/skeleton';
const Canvas = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    isLoading,
    fetchWorkflow
  } = useAutomationStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      addNode: state.addNode,
      isLoading: state.isLoading,
      fetchWorkflow: state.fetchWorkflow
    }))
  );
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  useEffect(() => {
    fetchWorkflow('sample-workflow-1');
  }, [fetchWorkflow]);
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!reactFlowWrapper.current) return;
      const dataString = event.dataTransfer.getData('application/reactflow');
      if (!dataString) return;
      const data: WorkflowNodeData = JSON.parse(dataString);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });
      const newNode = {
        id: `node_${Date.now()}`,
        type: 'custom',
        position,
        data
      };
      addNode(newNode);
    },
    [screenToFlowPosition, addNode]
  );
  if (isLoading) {
    return <Skeleton className="w-full h-full" />;
  }
  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
        className="bg-muted/30">
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
export function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}