import { ButtonLink } from '@/components/ui/ButtonLink';
import { StatePanel } from '@/components/ui/StatePanel';

export function NotFoundPage() {
  return (
    <StatePanel
      title="Not found"
      description="The page you requested does not exist. Head back to the landing page to keep exploring."
      action={<ButtonLink to="/">Back to home</ButtonLink>}
    />
  );
}
