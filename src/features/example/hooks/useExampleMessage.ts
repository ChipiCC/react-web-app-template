import { useQuery } from '@tanstack/react-query';

import { exampleMessageQuery } from '../api';

export function useExampleMessage() {
  return useQuery(exampleMessageQuery);
}
