import { UserAsset } from '@/src/components/asset/UserAsset'
import { ActionButton } from '@/src/components/buttons/ActionButton'
import { Amount } from '@/src/components/helpers/Amount'
import { EmptyContent } from '@/src/components/helpers/EmptyContent'
import { withGenericSuspense } from '@/src/components/helpers/SafeSuspense'
import { ActionsWrapper } from '@/src/components/layout/ActionsWrapper'
import { AssetsList } from '@/src/components/layout/AssetsList'
import { Loading } from '@/src/components/loading/Loading'
import { agaveTokens } from '@/src/config/agaveTokens'
import { InterestRateMode, useUserBorrows } from '@/src/hooks/presentation/useUserBorrows'
import { useModalsContext } from '@/src/providers/modalsProvider'

const UserBorrowsList = withGenericSuspense(
  () => {
    const userBorrows = useUserBorrows()
    const { openBorrowRepayModal } = useModalsContext()

    return !userBorrows.length ? (
      <EmptyContent
        link={{
          text: 'All markets',
          href: '/',
        }}
        text="In order to borrow you need to deposit any asset to be used as collateral."
        title="Nothing borrowed yet"
      />
    ) : (
      <>
        {userBorrows.map(
          ({ assetAddress, borrowMode, borrowRate, borrowedAmount, borrowedAmountInDAI }) => {
            const { decimals, symbol } = agaveTokens.getTokenByAddress(assetAddress)

            return (
              <UserAsset
                badge={InterestRateMode[borrowMode]}
                baseRate={borrowRate.base}
                incentivesRate={borrowRate.incentive}
                isBorrow
                key={`${assetAddress}-${borrowMode}`}
                tokenAddress={assetAddress}
                tokenValue={
                  <Amount
                    decimals={decimals}
                    symbol={symbol}
                    symbolPosition="after"
                    value={borrowedAmount}
                  />
                }
                totalAP={borrowRate.total}
                usdValue={<Amount value={borrowedAmountInDAI} />}
              >
                <ActionsWrapper>
                  <ActionButton
                    onClick={() =>
                      openBorrowRepayModal({
                        activeTab: 'repay',
                        mode: borrowMode,
                        tokenAddress: assetAddress,
                      })
                    }
                    variant="dark"
                  >
                    Repay
                  </ActionButton>
                  <ActionButton
                    onClick={() =>
                      openBorrowRepayModal({
                        activeTab: 'borrow',
                        mode: borrowMode,
                        tokenAddress: assetAddress,
                      })
                    }
                  >
                    Borrow
                  </ActionButton>
                </ActionsWrapper>
              </UserAsset>
            )
          },
        )}
      </>
    )
  },
  () => <Loading text="Fetching user borrows..." />,
)

export const UserBorrows = () => {
  return (
    <AssetsList>
      <UserBorrowsList />
    </AssetsList>
  )
}
