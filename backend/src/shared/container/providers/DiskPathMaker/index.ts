import { container } from 'tsyringe';

import IPathMaker from './models/IPathMaker';
import DiskPathMaker from './implementations/DiskPathMaker';

container.registerSingleton<IPathMaker>('PathMaker', DiskPathMaker);
