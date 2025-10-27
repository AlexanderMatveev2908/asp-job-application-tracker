import test, { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { TkResT } from 'tests/E2E/lib_tests/etc/types';
import { totp } from 'otplib';
import { HashAlgorithms, KeyEncodings } from 'otplib/core.js';
import { TotpFormUiFkt } from '@/core/forms/2fa/swaps/totp_form/etc/ui_fkt';
import { LibBinary } from '@/core/lib/data_structure/binary';

test('ok', async ({ browser }: { browser: Browser }) => {
  const _lib: LibTests = await LibTests.fromBrowser(browser);
  const res: TkResT = await _lib.getTk({ use2FA: true });

  // ? simple login
  const lib: LibTests = await LibTests.fromBrowser(browser);
  await lib.login(res);

  // ? user managed differently with 2FA
  // ? pushed to dedicated 2FA swap form
  await lib.waitPushTo('/auth/login-2fa');

  await lib.setForm2faIDs('login_2fa');
  const totpForm: Locator = await lib.getTotpForm();

  totp.options = {
    encoding: KeyEncodings.HEX,
    algorithm: HashAlgorithms.SHA1,
    step: 30,
    digits: 6,
  };
  const totpCode: string = totp.generate(LibBinary.hexFromB32(res.totpSecret as string));

  for (let i = 0; i < TotpFormUiFkt.nFields; i++) {
    await lib.fillWith(totpForm, {
      field: `totp.${i}`,
      val: totpCode.charAt(i),
    });
  }

  await lib.submitTotp();

  await lib.waitPushTo('/');
  await lib.isToastOk();
});
