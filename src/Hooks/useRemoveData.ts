import { useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import {
  clearEndpoint,
  clearFileStatuses,
} from '../Features/Signer/EndpointSlice'
import { clearAll, clearFileName } from '../Features/Signer/FileSlice'
import { clearHash } from '../Features/Signer/hashSlice'
import { clearSign } from '../Features/Signer/SignatureSlice'
import { clearJWS } from '../Features/Signer/VerifyJwsSlice'

export function useRemoveData(fromVeriifer: boolean) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearAll())
    dispatch(clearHash())

    if (fromVeriifer) {
      dispatch(clearSign())
    } else {
      dispatch(clearSign())
      dispatch(clearFileName())
      dispatch(clearEndpoint())
      dispatch(clearJWS())
      dispatch(clearFileStatuses())
    }
  }, [fromVeriifer, dispatch])
}
