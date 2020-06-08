import { differenceInDays } from 'date-fns'
import scheduleJSON from '../schedule.json'

export function parseReleases() {
  const scheduleReleases = []
  let yAxisCounter = 0

  for (const [key, release] of Object.entries(scheduleJSON)) {
    const releaseItems = []
    const releaseFullName = `${key} ${
      release.codename ? ' - ' + release.codename : ''
    }`
    const releaseVersion = key

    const releaseBase = {
      name: releaseFullName,
      phase: releaseVersion,
      start: new Date(release.start).getTime(),
      end: new Date(release.end).getTime(),
      y: yAxisCounter
    }

    if (release.lts && release.maintenance) {
      releaseBase.end = new Date(release.lts).getTime()

      const releaseLts = {
        name: releaseFullName,
        phase: 'LTS',
        start: new Date(release.lts).getTime(),
        end: new Date(release.maintenance).getTime(),
        y: yAxisCounter
      }

      const releaseMaintenance = {
        name: releaseFullName,
        phase: 'Maintenance',
        start: new Date(release.maintenance).getTime(),
        end: new Date(release.end).getTime(),
        y: yAxisCounter
      }

      releaseItems.push(releaseBase, releaseLts, releaseMaintenance)
    } else if (release.maintenance) {
      releaseBase.end = new Date(release.maintenance).getTime()

      const releaseMaintenance = {
        name: releaseFullName,
        phase: 'Maintenance',
        start: new Date(release.maintenance).getTime(),
        end: new Date(release.end).getTime(),
        y: yAxisCounter
      }

      releaseItems.push(releaseBase, releaseMaintenance)
    } else {
      releaseItems.push(releaseBase)
    }

    scheduleReleases.push(...releaseItems)
    yAxisCounter++
  }

  return {
    existingLTS: getExistingLTS(scheduleJSON),
    getActiveLTS: getActiveLTS(scheduleJSON),
    current: getCurrent(scheduleJSON),
    firstReleaseStartDate: scheduleReleases[0].start,
    lastReleaseEndDate: scheduleReleases[scheduleReleases.length - 1].end,
    releasesSortedDesc: scheduleReleases.reverse()
  }
}

function getExistingLTS(scheduleJSON) {
  const existingLTS = {
    endDate: 0,
    daysRemainingToEOL: 0,
    version: ''
  }

  for (const [key, release] of Object.entries(scheduleJSON)) {
    const releaseVersion = key

    if (!existingLTS.endDate) {
      const currentTime = new Date().getTime()
      const releaseEndTime = new Date(release.end).getTime()
      if (currentTime < releaseEndTime) {
        existingLTS.endDate = releaseEndTime
        existingLTS.daysRemainingToEOL = differenceInDays(
          new Date(existingLTS.endDate),
          new Date()
        )
        existingLTS.version = releaseVersion
      }
    }
  }

  return existingLTS
}

function getActiveLTS(scheduleJSON) {
  const versions = []

  for (const release of Object.values(scheduleJSON)) {
    const currentTime = new Date().getTime()
    const releaseStartLTS = new Date(release.lts).getTime()
    const releaseStartMaintenance = new Date(release.maintenance).getTime()

    if (
      currentTime >= releaseStartLTS &&
      currentTime <= releaseStartMaintenance
    ) {
      versions.push(release)
    }
  }

  if (versions.length === 1) {
    return versions[0]
  }

  let lastVersionDaysDiff = 0
  let activeLTS
  versions.forEach((ltsVersion) => {
    const daysFromRelease = differenceInDays(
      new Date(),
      new Date(ltsVersion.lts)
    )

    if (lastVersionDaysDiff === 0) {
      lastVersionDaysDiff = daysFromRelease
    }

    if (daysFromRelease <= lastVersionDaysDiff) {
      activeLTS = ltsVersion
      lastVersionDaysDiff = daysFromRelease
    }
  })

  return activeLTS
}

function getCurrent(scheduleJSON) {
  const current = {
    startDate: 0,
    startActiveDate: 0,
    daysRemainingToStartActive: 0,
    version: ''
  }

  for (const [key, release] of Object.entries(scheduleJSON)) {
    const releaseVersion = key

    if (release.lts) {
      current.startDate = new Date(release.start).getTime()
      current.startActiveDate = new Date(release.lts).getTime()
      current.daysRemainingToStartActive = differenceInDays(
        current.startActiveDate,
        new Date()
      )
      current.version = releaseVersion
    }
  }

  return current
}
