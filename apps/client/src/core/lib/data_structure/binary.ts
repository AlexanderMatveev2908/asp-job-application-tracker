import { Nullable } from '@/common/types/etc';

export class LibBinary {
  public static binaryFromHex(arg: string): Uint8Array {
    const pairs: Nullable<RegExpMatchArray> = arg.match(/.{1,2}/g);
    if (!pairs) return new Uint8Array();

    return new Uint8Array(pairs.map((chars: string) => parseInt(chars, 16)));
  }

  public static utf8FromBinary(binary: Uint8Array): string {
    return new TextDecoder('utf-8').decode(binary);
  }
}
