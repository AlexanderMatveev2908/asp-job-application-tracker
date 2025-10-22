import { AadCbcHmacT } from '@/common/types/tokens';
import { Binary } from './binary';
import { Nullable } from '@/common/types/etc';

export class CbcHmacTk {
  public static aadFrom(token: string): Nullable<AadCbcHmacT> {
    const maxParts: number = 4;
    const parts: string[] = token.split('.', maxParts);

    try {
      const binaryAad: Uint8Array = Binary.binaryFromHex(parts[0]);
      const json: string = Binary.utf8FromBinary(binaryAad);
      const map: AadCbcHmacT = JSON.parse(json);

      return map;
    } catch {
      return null;
    }
  }
}
