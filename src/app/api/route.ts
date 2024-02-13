import { redirect } from 'next/navigation';
import { userAgent } from 'next/server';

export async function GET(req: Request) {
	const { device, os, browser } = userAgent(req);
	const isMobile = device.type === 'mobile' || device.type === 'tablet';

	if (!isMobile) {
		return Response.json({ message: "Scansiona il QR da mobile.", isMobile: false });
	}

	if (isMobile) {
		const isApple = device.model === 'iPhone' || (device.model === 'iPad' && browser.name === 'Safari');
		const isAndroid = os.name === 'Android';

		const androidLink =
			'intent://arvr.google.com/scene-viewer/1.0?file=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;';

		if (isApple) {
			redirect('/nike.usdz');
		} else if (isAndroid) {
			redirect(androidLink);
		}
	}

	return new Response('Device not supported', { status: 400 });
}
