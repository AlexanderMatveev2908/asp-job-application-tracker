import { AadCbcHmacT, TokenT } from '@/features/cbcHmac/etc/types';
import { Binary } from '../../../core/lib/data_structure/binary';
import { Nullable } from '@/common/types/etc';
import { Reg } from '@/core/paperwork/reg';

export class LibCbcHmac {
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

  public static isOfType(token: Nullable<string>, expected: TokenT): boolean {
    if (!token || !Reg.isCbcHmac(token)) return false;

    const aad: Nullable<AadCbcHmacT> = this.aadFrom(token);
    if (!aad) return false;

    return aad.tokenT === expected;
  }
}
