import { BigNumber } from '@ethersproject/bignumber'

import { ButtonPrimary } from '@/src/components/buttons/Button'
import { Amount } from '@/src/components/helpers/Amount'
import { agaveTokens } from '@/src/config/agaveTokens'
import { useDepositSteps } from '@/src/pagePartials/markets/deposit/hooks/useDepositSteps'
import { Steps } from '@/src/pagePartials/markets/stepper'

interface DepositStepperInfoProps {
  amount: string
  tokenAddress: string
}

const DepositStepperInfo = ({ amount, tokenAddress }: DepositStepperInfoProps) => {
  const tokenInfo = agaveTokens.getTokenByAddress(tokenAddress)
  const newHealthFactor = 0

  return (
    <>
      <div data-id="summary">
        <p>These are your transaction details.</p>
        <p>Please verify them before submitting.</p>
      </div>
      <div data-id="info-amount">
        <div>Amount</div>
        <Amount
          decimals={tokenInfo.decimals}
          symbol={tokenInfo.symbol}
          value={BigNumber.from(amount)}
        />
      </div>
      <div data-id="info-newHealthFactor">
        <div>New health factor</div>
        <div>{newHealthFactor}%</div>
      </div>
    </>
  )
}

interface DepositStepperProps {
  amount: string
  cancel: () => void
  tokenAddress: string
}

export function DepositStepper({ amount, cancel, tokenAddress }: DepositStepperProps) {
  const depositSteps = useDepositSteps({
    tokenAddress,
    amount,
  })

  const params = {
    ...depositSteps,
    info: <DepositStepperInfo amount={amount} tokenAddress={tokenAddress} />,
    title: 'Deposit overview',
    titleButton: <ButtonPrimary onClick={cancel}>Cancel</ButtonPrimary>,
  }

  return <Steps {...params} />
}
