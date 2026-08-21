import { ComponentProps } from 'react';

// third-party
import { FormattedMessage } from 'react-intl';

type Props = Omit<ComponentProps<typeof FormattedMessage>, 'id'> & {
  id?: any;
};

// ==============================|| COMPONENT: FORMATTED MESSAGE WRAPPER ||============================== //

export default function SafeFormattedMessage({ id, ...rest }: Props) {
  if (typeof id === 'string' && id.trim().length > 0) {
    return <FormattedMessage id={id as any} {...rest} />;
  }

  return <></>;
}
