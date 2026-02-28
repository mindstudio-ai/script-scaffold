import { MindStudioAgent } from '@mindstudio-ai/agent';

export const handler = async (
  topic: string,
): Promise<{
  result: string;
}> => {
  const agent = new MindStudioAgent();

  const { content } = await agent.generateText({
    message: `Write a haiku about ${topic}. Respond only with the haiku and absolutely no other text.`,
  });

  return {
    result: content,
  };
};
