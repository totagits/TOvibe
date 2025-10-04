import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'react-flow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkflowNodeData } from '@shared/types';
import { cn } from '@/lib/utils';
import { DynamicIcon } from '@/components/DynamicIcon';
const CustomNode = ({ data }: NodeProps<WorkflowNodeData>) => {
  return (
    <Card className={cn("w-64 shadow-md hover:shadow-lg transition-shadow duration-200", {
      'border-blue-500': data.type === 'trigger',
      'border-green-500': data.type === 'action',
    })}>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-3">
        <div className={cn("p-2 rounded-md", {
          'bg-blue-100 dark:bg-blue-900': data.type === 'trigger',
          'bg-green-100 dark:bg-green-900': data.type === 'action',
        })}>
          <DynamicIcon name={data.icon} className={cn("h-5 w-5", {
            'text-blue-600 dark:text-blue-300': data.type === 'trigger',
            'text-green-600 dark:text-green-300': data.type === 'action',
          })} />
        </div>
        <CardTitle className="text-sm font-semibold">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xs text-muted-foreground">{data.description}</p>
      </CardContent>
      <Handle type="target" position={Position.Left} className="!bg-slate-500" />
      <Handle type="source" position={Position.Right} className="!bg-slate-500" />
    </Card>
  );
};
export default memo(CustomNode);