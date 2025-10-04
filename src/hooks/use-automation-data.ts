import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from 'react-flow';
import { WorkflowNode, WorkflowEdge } from '@shared/types';
import { api } from '@/lib/api-client';
export type RFState = {
  nodes: Node<WorkflowNode['data']>[];
  edges: Edge<WorkflowEdge>[];
  isLoading: boolean;
  fetchWorkflow: (workflowId: string) => Promise<void>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
};
export const useAutomationStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  isLoading: true,
  fetchWorkflow: async (workflowId: string) => {
    set({ isLoading: true });
    try {
      const workflowData = await api<{ id: string; name: string; nodes: WorkflowNode[]; edges: WorkflowEdge[] }>(
        `/api/automation/workflows/${workflowId}`
      );
      const nodesWithCorrectType = workflowData.nodes.map(n => ({ ...n, type: 'custom' }));
      set({
        nodes: nodesWithCorrectType,
        edges: workflowData.edges,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch workflow", error);
      set({ isLoading: false });
    }
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge({ ...connection, animated: true }, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  addNode: (newNode: Node) => {
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  }
}));