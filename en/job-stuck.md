---
slug: job-stuck
category: troubleshooting
status: published
lang: en
title: "Job Is Stuck in a Status"
---

## Check the job status

1. Go to **Data → Production → Jobs**
2. Find the job and note its current status

## Common stuck statuses

| Status | Common causes |
|---|---|
| **Pending** | No Workflow has picked it up; trigger condition not met |
| **In Progress** | A Workflow is paused — HITL task not completed |
| **Waiting** | Manual task assigned but not acted on |

## For jobs stuck at Pending

1. Check if a Workflow should trigger on job creation
2. Verify the trigger conditions in the Workflow
3. Check the Executions tab for recent failures

[Workflow Is Not Triggering](#workflow-not-triggering)

## For jobs stuck In Progress

1. Open the Job
2. Check the **Tasks** section for open, unassigned tasks
3. Assign and complete the task to resume the Workflow

## Manually advancing a job

1. Open the Job
2. Use the **Status** field to manually set the appropriate next status
3. Document the reason in the job Notes

## Escalation

Check Workflow execution logs for error messages around the time the job stopped progressing.